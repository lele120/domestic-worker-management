'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Clock, Calendar, Coffee, Plus, Minus } from 'lucide-react'
import InputField from '@/components/shared/forms/InputField'
import SelectField from '@/components/shared/forms/SelectField'

interface DailySchedule {
  enabled: boolean
  startTime: string
  endTime: string
  breaks: {
    startTime: string
    duration: number
  }[]
}

interface ScheduleFormProps {
  formData: {
    weeklyHours: number
    schedule: {
      [key: string]: DailySchedule
    }
    holidayWork: boolean
    holidayCompensation: string
    nightShift: boolean
    nightShiftStartTime: string
    nightShiftEndTime: string
  }
  onChange: (name: string, value: any) => void
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

  const handleDayScheduleChange = (day: string, field: string, value: any) => {
    onChange('schedule', {
      ...formData.schedule,
      [day]: {
        ...formData.schedule[day],
        [field]: value
      }
    })
  }

  const handleBreakChange = (day: string, index: number, field: string, value: any) => {
    const newSchedule = {
      ...formData.schedule,
      [day]: {
        ...formData.schedule[day],
        breaks: formData.schedule[day].breaks.map((breakItem, i) => 
          i === index ? { ...breakItem, [field]: value } : breakItem
        )
      }
    }
    onChange('schedule', newSchedule)
  }

  const addBreak = (day: string) => {
    const newSchedule = {
      ...formData.schedule,
      [day]: {
        ...formData.schedule[day],
        breaks: [
          ...formData.schedule[day].breaks,
          { startTime: '12:00', duration: 30 }
        ]
      }
    }
    onChange('schedule', newSchedule)
  }

  const removeBreak = (day: string, index: number) => {
    const newSchedule = {
      ...formData.schedule,
      [day]: {
        ...formData.schedule[day],
        breaks: formData.schedule[day].breaks.filter((_, i) => i !== index)
      }
    }
    onChange('schedule', newSchedule)
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
            name="weeklyHours"
            type="number"
            value={formData.weeklyHours.toString()}
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
                    checked={formData.schedule[day.value].enabled}
                    onChange={(e) => handleDayScheduleChange(day.value, 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 font-medium text-gray-900">{day.label}</span>
                </label>
              </div>

              {formData.schedule[day.value].enabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={t('contract.schedule.fields.startTime')}
                      name={`${day.value}-start`}
                      type="time"
                      value={formData.schedule[day.value].startTime}
                      onChange={(e) => handleDayScheduleChange(day.value, 'startTime', e.target.value)}
                    />
                    <InputField
                      label={t('contract.schedule.fields.endTime')}
                      name={`${day.value}-end`}
                      type="time"
                      value={formData.schedule[day.value].endTime}
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
                      {formData.schedule[day.value].breaks.map((breakItem, index) => (
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
                              label={t('contract.schedule.fields.breakDuration')}
                              name={`${day.value}-break-${index}-duration`}
                              type="number"
                              value={breakItem.duration.toString()}
                              onChange={(e) => handleBreakChange(day.value, index, 'duration', parseInt(e.target.value))}
                            />
                          </div>
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
              name="nightShift"
              checked={formData.nightShift}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{t('contract.schedule.fields.nightShift')}</span>
          </label>
          
          {formData.nightShift && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label={t('contract.schedule.fields.nightShiftStart')}
                name="nightShiftStartTime"
                type="time"
                value={formData.nightShiftStartTime}
                onChange={handleInputChange}
              />
              <InputField
                label={t('contract.schedule.fields.nightShiftEnd')}
                name="nightShiftEndTime"
                type="time"
                value={formData.nightShiftEndTime}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Holiday Work */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.schedule.sections.holidays')}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="holidayWork"
              checked={formData.holidayWork}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{t('contract.schedule.fields.holidayWork')}</span>
          </label>
          
          {formData.holidayWork && (
            <SelectField
              label={t('contract.schedule.fields.holidayCompensation')}
              name="holidayCompensation"
              value={formData.holidayCompensation}
              onChange={handleInputChange}
              options={[
                { value: 'paid', label: t('contract.schedule.options.holidayCompensation.paid') },
                { value: 'timeoff', label: t('contract.schedule.options.holidayCompensation.timeoff') },
                { value: 'both', label: t('contract.schedule.options.holidayCompensation.both') }
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm