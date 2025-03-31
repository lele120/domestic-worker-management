'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Clock, Calendar, Coffee, Plus, Minus } from 'lucide-react'
import InputField from '@/components/shared/forms/InputField'
import SelectField from '@/components/shared/forms/SelectField'
import { DailySchedule } from '@/types/contract.types'

interface ScheduleFormProps {
  formData: {
    workSchedule: {
      weeklyHours: number
      schedule: {
        [key: string]: DailySchedule
      }
      holidayWork: boolean
      holidayCompensation: string
      nightShift: boolean
      nightShiftStartTime: string
      nightShiftEndTime: string
      holidayAccrualType?: string
      patronSaintDay?: string
      manualSeniorityManagement?: boolean
      accruedSeniority?: number
      lastSeniorityDate?: string
      nextSeniorityDate?: string
      trialPeriodEnabled?: boolean
      trialPeriodDays?: number
      includeNoticePeriod?: boolean
      includeSpecialNotice?: boolean
    }
  }
  onChange: (name: string, value: string | number | boolean | { [key: string]: DailySchedule }) => void
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()

  const days = [
    { value: 'monday', label: t('contract.schedule.days.monday') },
    { value: 'tuesday', label: t('contract.schedule.days.tuesday') },
    { value: 'wednesday', label: t('contract.schedule.days.wednesday') },
    { value: 'thursday', label: t('contract.schedule.days.thursday') },
    { value: 'friday', label: t('contract.schedule.days.friday') },
    { value: 'saturday', label: t('contract.schedule.days.saturday') },
    { value: 'sunday', label: t('contract.schedule.days.sunday') }
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDayScheduleChange = (day: string, field: string, value: any) => {
    console.log(day, field, value)
    onChange('workSchedule.schedule', {
      ...formData.workSchedule.schedule,
      [day]: {
        ...formData.workSchedule.schedule[day],
        [field]: value
      }
    })
  }

  const handleBreakChange = (day: string, index: number, field: string, value: string | number) => {
    const newSchedule = {
      ...formData.workSchedule.schedule,
      [day]: {
        ...formData.workSchedule.schedule[day],
        breaks: formData.workSchedule.schedule[day].breaks.map((breakItem, i) => 
          i === index ? { ...breakItem, [field]: value } : breakItem
        )
      }
    }
    onChange('workSchedule.schedule', newSchedule)
  }

  const addBreak = (day: string) => {
    const newSchedule = {
      ...formData.workSchedule.schedule,
      [day]: {
        ...formData.workSchedule.schedule[day],
        breaks: [
          ...formData.workSchedule.schedule[day].breaks,
          { startTime: '12:00', endTime: '12:30', duration: 30 }
        ]
      }
    }
    onChange('workSchedule.schedule', newSchedule)
  }

  const removeBreak = (day: string, index: number) => {
    const newSchedule = {
      ...formData.workSchedule.schedule,
      [day]: {
        ...formData.workSchedule.schedule[day],
        breaks: formData.workSchedule.schedule[day].breaks.filter((_, i) => i !== index)
      }
    }
    onChange('workSchedule.schedule', newSchedule)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      onChange(name, (e.target as HTMLInputElement).checked)
    } else if (type === 'number') {
      onChange(name, parseFloat(value))
    } else {
      onChange(name, value)
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    onChange(name, checked)
  }

  const handleNumberChange = (name: string, value: string) => {
    onChange(name, parseInt(value))
  }

  const handleDateChange = (name: string, value: string) => {
    onChange(name, value)
  }

  return (
    <div className="space-y-8">
      {/* Weekly Hours */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          {t('contract.schedule.sections.weeklyHours')}
        </h2>
        <div className="w-1/3">
          <InputField
            label={t('contract.schedule.fields.totalWeeklyHours')}
            name="workSchedule.weeklyHours"
            type="number"
            value={formData.workSchedule.weeklyHours.toString()}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Daily Schedules */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-500" />
          {t('contract.schedule.sections.dailySchedule')}
        </h2>
        <div className="space-y-6">
          {days.map(day => (
            <div key={day.value} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.workSchedule.schedule[day.value].enabled}
                    onChange={(e) => handleDayScheduleChange(day.value, 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 font-medium text-gray-900">{day.label}</span>
                </label>
              </div>

              {formData.workSchedule.schedule[day.value].enabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={t('contract.schedule.fields.startTime')}
                      name={`workSchedule.${day.value}-start`}
                      type="time"
                      value={formData.workSchedule.schedule[day.value].startTime}
                      onChange={(e) => handleDayScheduleChange(day.value, 'startTime', e.target.value)}
                    />
                    <InputField
                      label={t('contract.schedule.fields.endTime')}
                      name={`workSchedule.${day.value}-end`}
                      type="time"
                      value={formData.workSchedule.schedule[day.value].endTime}
                      onChange={(e) => handleDayScheduleChange(day.value, 'endTime', e.target.value)}
                    />
                  </div>

                  {/* Breaks */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <Coffee className="w-4 h-4 mr-2 text-blue-500" />
                        {t('contract.schedule.sections.breaks')}
                      </h3>
                      <button
                        type="button"
                        onClick={() => addBreak(day.value)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {t('contract.schedule.actions.addBreak')}
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {formData.workSchedule.schedule[day.value].breaks.map((breakItem, index) => (
                        <div key={index} className="flex items-end gap-4">
                          <div className="flex-1">
                            <InputField
                              label={t('contract.schedule.fields.breakStart')}
                              name={`${day.value}-break-${index}-start`}
                              type="time"
                              value={breakItem.startTime}
                              onChange={(e) => handleBreakChange(day.value, index, 'startTime', e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <InputField
                              label={t('contract.schedule.fields.breakEnd')}
                              name={`${day.value}-break-${index}-start`}
                              type="time"
                              value={breakItem.endTime}
                              onChange={(e) => handleBreakChange(day.value, index, 'endTime', e.target.value)}
                            />
                          </div>
                          {/* <div className="flex-1">
                            <InputField
                              label={t('contract.schedule.fields.breakDuration')}
                              name={`${day.value}-break-${index}-duration`}
                              type="number"
                              value={breakItem.duration!.toString()}
                              onChange={(e) => handleBreakChange(day.value, index, 'duration', parseInt(e.target.value))}
                            />
                          </div> */}
                          <button
                            type="button"
                            onClick={() => removeBreak(day.value, index)}
                            className="mb-2 p-2 text-gray-400 hover:text-red-500"
                            title={t('contract.schedule.actions.removeBreak')}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Night Shift */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.schedule.sections.nightShift')}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="workSchedule.nightShift"
              checked={formData.workSchedule.nightShift}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{t('contract.schedule.fields.nightShift')}</span>
          </label>
          
          {formData.workSchedule.nightShift && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label={t('contract.schedule.fields.nightShiftStart')}
                name="workSchedule.nightShiftStartTime"
                type="time"
                value={formData.workSchedule.nightShiftStartTime}
                onChange={handleInputChange}
              />
              <InputField
                label={t('contract.schedule.fields.nightShiftEnd')}
                name="workSchedule.nightShiftEndTime"
                type="time"
                value={formData.workSchedule.nightShiftEndTime}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Holiday Work */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.schedule.sections.holidays')}</h2>
        <div className="space-y-6">
          {/* Holiday Work Checkbox and Compensation */}
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="workSchedule.holidayWork"
              checked={formData.workSchedule.holidayWork}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{t('contract.schedule.fields.holidayWork')}</span>
          </label>
          
          {formData.workSchedule.holidayWork && (
              <div className="ml-8">
            <SelectField
              label={t('contract.schedule.fields.holidayCompensation')}
                  name="workSchedule.holidayCompensation"
              value={formData.workSchedule.holidayCompensation}
              onChange={handleInputChange}
              options={[
                { value: 'paid', label: t('contract.schedule.options.holidayCompensation.paid') },
                { value: 'timeoff', label: t('contract.schedule.options.holidayCompensation.timeoff') },
                { value: 'both', label: t('contract.schedule.options.holidayCompensation.both') }
              ]}
            />
              </div>
            )}
          </div>

          {/* Holiday Accrual Type */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              {t('contract.schedule.fields.holidayAccrualType')}
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workSchedule.holidayAccrualType"
                  value="hours"
                  checked={formData.workSchedule.holidayAccrualType === 'hours' || !formData.workSchedule.holidayAccrualType}
                  onChange={handleInputChange}
                  className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {t('contract.schedule.options.holidayAccrual.hours')}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workSchedule.holidayAccrualType"
                  value="days"
                  checked={formData.workSchedule.holidayAccrualType === 'days'}
                  onChange={handleInputChange}
                  className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {t('contract.schedule.options.holidayAccrual.days')}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workSchedule.holidayAccrualType"
                  value="proportional"
                  checked={formData.workSchedule.holidayAccrualType === 'proportional'}
                  onChange={handleInputChange}
                  className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {t('contract.schedule.options.holidayAccrual.proportional')}
                </span>
              </label>
            </div>
          </div>

          {/* Patron Saint Day */}
          <div>
            <InputField
              label={t('contract.schedule.fields.patronSaintDay')}
              name="workSchedule.patronSaintDay"
              type="date"
              value={formData.workSchedule.patronSaintDay || ''}
              onChange={handleInputChange}
            />
          </div>

          {/* Seniority Management */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="manualSeniorityManagement"
                checked={formData.workSchedule.manualSeniorityManagement || false}
                onChange={(e) => handleCheckboxChange('workSchedule.manualSeniorityManagement', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="manualSeniorityManagement" className="text-sm font-medium">
                {t('contract.schedule.fields.manualSeniorityManagement')}
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('contract.schedule.fields.manualSeniorityDescription')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="accruedSeniority" className="text-sm font-medium">
                  {t('contract.schedule.fields.accruedSeniority')} *
                </label>
                <input
                  id="accruedSeniority"
                  type="number"
                  value={formData.workSchedule.accruedSeniority?.toString() || ''}
                  onChange={(e) => handleNumberChange('workSchedule.accruedSeniority', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastSeniorityDate" className="text-sm font-medium">
                  {t('contract.schedule.fields.lastSeniorityDate')} *
                </label>
                <div className="relative">
                  <input
                    id="lastSeniorityDate"
                    type="date"
                    value={formData.workSchedule.lastSeniorityDate || ''}
                    onChange={(e) => handleDateChange('workSchedule.lastSeniorityDate', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="nextSeniorityDate" className="text-sm font-medium">
                  {t('contract.schedule.fields.nextSeniorityDate')} *
                </label>
                <div className="relative">
                  <input
                    id="nextSeniorityDate"
                    type="date"
                    value={formData.workSchedule.nextSeniorityDate || ''}
                    onChange={(e) => handleDateChange('workSchedule.nextSeniorityDate', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trial Period */}
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="workSchedule.trialPeriodEnabled"
                checked={formData.workSchedule.trialPeriodEnabled || false}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">
                {t('contract.schedule.fields.trialPeriod')}
              </span>
            </label>

            {formData.workSchedule.trialPeriodEnabled && (
              <div className="ml-8">
                <InputField
                  label={t('contract.schedule.fields.trialPeriodDays')}
                  name="workSchedule.trialPeriodDays"
                  type="number"
                  min="0"
                  max="30"
                  value={formData.workSchedule.trialPeriodDays?.toString() || '8'}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* Notice Period for Fixed Term */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="workSchedule.includeNoticePeriod"
                checked={formData.workSchedule.includeNoticePeriod || false}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">
                {t('contract.schedule.fields.includeNoticePeriod')}
              </span>
            </label>
          </div>

          {/* Notice Period for Special Workers */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="workSchedule.includeSpecialNotice"
                checked={formData.workSchedule.includeSpecialNotice || false}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">
                {t('contract.schedule.fields.includeSpecialNotice')}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm