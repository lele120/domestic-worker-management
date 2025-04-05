'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { HelpCircle } from 'lucide-react'
import InputField from '@/components/shared/forms/InputField'
import SelectField from '@/components/shared/forms/SelectField'
import { getSubCategories, SubCategory, getTerminationReasons, TerminationReason,
  getContractLevel, ContractLevel, getContractDeterminateReason, ContractDeterminateReason,
  getPaymentMethods, PaymentMethod
} from '@/app/api/auth/contract.configuration.service'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { ContractColf } from '@/types/contract.types'

interface ContractFormProps {
  formData: {
    contractColf: ContractColf
  }
  onChange: (name: string, value: string | boolean | Date) => void
}

const ContractForm: React.FC<ContractFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()
  const { data: session } = useSession();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [terminationReasons, setTerminationReasons] = useState<TerminationReason[]>([]);
  const [contractLevels, setContractLevels] = useState<ContractLevel[]>([]);
  const [contractDeterminateReasons, setContractDeterminateReasons] = useState<ContractDeterminateReason[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [contractLevelsDict] = useState<{ [key: string]: string }>({});
  const [contractSubCategoryDict] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const token = session?.user.accessToken as string;
      let resSubCategories : SubCategory[] = [];
      let resTerminationReasons : TerminationReason[] = [];
      let resContractLevels : ContractLevel[] = [];
      let resContractDeterminateReasons : ContractDeterminateReason[] = [];
      let resPaymentMethods : PaymentMethod[] = [];

      resContractLevels = await getContractLevel({"category": "COLF"}, token);
      resContractLevels.map((contractLevel) => {
        // create a dictionary with id: subcategory
        contractLevelsDict[contractLevel.id] = contractLevel.subcategory;
      })

      resSubCategories = await getSubCategories(token);
      resSubCategories.map((subCategory) => {
        contractSubCategoryDict[subCategory.id] = subCategory.name;
      })

      resTerminationReasons = await getTerminationReasons(token);
      resContractDeterminateReasons = await getContractDeterminateReason({"category": "COLF"}, token);
      resPaymentMethods = await getPaymentMethods(token);

      if (resContractDeterminateReasons != undefined) {
        setContractDeterminateReasons(resContractDeterminateReasons);
      }
      if (resContractLevels != undefined) {
        resContractLevels.push({name: "", category: "",subcategory: "", id: "", description: ""});
        setContractLevels(resContractLevels);
      }
      if (resSubCategories != undefined) {
        resSubCategories.push({name: "", value: "", id: "", description: ""});
        setSubCategories(resSubCategories);
      }
      if (resTerminationReasons != undefined) {
        resTerminationReasons.push({name: "", value: "", id: "", description: ""});
        setTerminationReasons(resTerminationReasons);
      }
      if (resPaymentMethods != undefined) {
        resPaymentMethods.push({name: "", value: "", id: "", description: ""});
        setPaymentMethods(resPaymentMethods);
      }
    };
  
    if (session) {
      fetchData();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    onChange(name, finalValue)
  }

  const getFilteredLevels = () => {
    // Log for debugging
    console.log('Current subCategory:', formData.contractColf.subCategory);
    console.log('Available levels:', contractLevels);

    if (formData.contractColf.subCategory === 'b0fb1b42-25c5-4b96-a8cb-4f6a15299b64' 
      || formData.contractColf.subCategory === 'd26009b4-297e-45fb-ba11-6c68f92c4eb2') {
      return contractLevels.filter(level => {
        // Log for debugging
        console.log('Checking level:', level);
        return ['dSuper', 'cSuper', 'bSuper'].includes(level.name);
      });
    }
    if (formData.contractColf.subCategory === 'd3c56888-227d-4c17-94e2-4aeedb402962') {
      return contractLevels.filter(level => {
        // Log for debugging
        console.log('Checking level:', level);
        return ['cSuper', 'bSuper', 'b'].includes(level.name);
      });
    }
    if (formData.contractColf.subCategory === 'e5f6a7b8-c9d0-8e1f-2a3b-4c5d6e7f8a9b') {
      return contractLevels.filter(level => {
        // Log for debugging
        console.log('Checking level:', level);
        return ['dSuper', 'cSuper'].includes(level.name);
      });
    }
    return contractLevels;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.title')}</h2>
        
        {/* Contract Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t('contract.contract.fields.startDate')}
            name="contractColf.startDate"
            type="date"
            value={formData.contractColf.startDate}
            onChange={handleInputChange}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="contractColf.isTerminated"
              checked={formData.contractColf.isTerminated}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.contract.fields.isTerminated')}</span>
          </label>
          
          {
            formData.contractColf.isTerminated && (
              <InputField
              label={t('contract.contract.fields.endDate')}
              name="contractColf.endDate"
              type="date"
              value={formData.contractColf.endDate}
              onChange={handleInputChange}
              required={false}
            />
            )
          }
          {formData.contractColf.isTerminated && (
            <SelectField
              label={t('contract.contract.fields.terminationReason')}
              name="contractColf.terminationReason"
              value={formData.contractColf.terminationReason}
              onChange={handleInputChange}
              options={terminationReasons.map((terminationReason) => ({
                value: terminationReason.id,
                label: t(`contract.contract.options.terminationReasons.${terminationReason.name}`)
              }))
              }
            />
          )}
        </div>
      </div>

      {/* SubCategory Type */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.type')}</h2>
        <SelectField
          label={t('contract.contract.fields.subCategory')}
          name="contractColf.subCategory"
          value={formData.contractColf.subCategory}
          onChange={handleInputChange}
          options={subCategories.map((subCategory) => ({
            value: subCategory.id,
            label: t(`contract.contract.options.subCategory.${subCategory.name}`)
          }))
          }
        />
      </div>

      {/* Level */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.level')}</h2>
        <div className="relative">
          <SelectField
            label={t('contract.contract.fields.level')}
            name="contractColf.level"
            value={formData.contractColf.level}
            onChange={handleInputChange}
            options={getFilteredLevels().map((contractLevel) => ({
              value: contractLevel.id,
              label: t(`contract.contract.options.levels.${contractLevel.subcategory}`)
            }))}
          />
          {formData.contractColf.level && (
            <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {t(`contract.contract.options.levels.${contractLevelsDict[formData.contractColf.level]}Description`)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Term Contract */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.fixedTerm')}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="contractColf.isFixedTerm"
              checked={formData.contractColf.isFixedTerm}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.contract.fields.isFixedTerm')}</span>
          </label>

          {formData.contractColf.isFixedTerm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label={t('contract.contract.fields.fixedTermEndDate')}
                name="contractColf.fixedTermEndDate"
                type="date"
                value={formData.contractColf.fixedTermEndDate}
                onChange={handleInputChange}
              />
              <SelectField
                label={t('contract.contract.fields.fixedTermReason')}
                name="contractColf.fixedTermReason"
                value={formData.contractColf.fixedTermReason}
                onChange={handleInputChange}
                options={contractDeterminateReasons.map((contractDeterminateReason) => ({
                  value: contractDeterminateReason.id,
                  label: t(`contract.contract.options.fixedTermReasons.${contractDeterminateReason.subcategory}`)
                }
                ))
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Quality Certification */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.certification')}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="contractColf.qualityCertification"
              checked={formData.contractColf.qualityCertification}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <div className="ml-2">
              <span className="text-sm font-medium text-gray-900">Certificazione di qualità</span>
              <p className="text-sm text-gray-500">Se il lavoratore è in possesso della certificazione di qualità di cui alla norma tecnica UNI 11766:2019 in corso di validità dal 01.10.2021 ha diritto ad una speciale indennità.</p>
            </div>
          </label>

          <div className="mt-4 space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="contractColf.childrenUnder6Allowance"
                checked={formData.contractColf.childrenUnder6Allowance}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <div className="ml-2">
                <span className="text-sm font-medium text-gray-900">Indennità assistenza minori di 6 anni</span>
                <p className="text-sm text-gray-500">Il CCNL prevede che se la baby sitter assiste uno o più bambini con età inferiore ai 6 anni ha diritto, dal 1 ottobre 2020, ad una speciale indennità.</p>
              </div>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="contractColf.isFamilyMember"
                checked={formData.contractColf.isFamilyMember}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <div className="ml-2">
                <span className="text-sm font-medium text-gray-900">Assunzione tra parenti conviventi</span>
                <p className="text-sm text-gray-500">Il lavoratore convive ed è coniuge del datore di lavoro o parente o affine entro il 3° grado (non applica la quota CUAF, cassa assegno nucleo familiare, sui contributi)</p>
              </div>
            </label>

            {formData.contractColf.isFamilyMember && (
              <div className="ml-6">
                <SelectField
                  label="Grado di parentela"
                  name="contractColf.familyRelationship"
                  value={formData.contractColf.familyRelationship || ''}
                  onChange={handleInputChange}
                  options={[
                    { value: '', label: 'Nessuna selezione' },
                    { value: 'figlio', label: 'Figlio' },
                    { value: 'figlia', label: 'Figlia' },
                    { value: 'padre', label: 'Padre' },
                    { value: 'madre', label: 'Madre' },
                    { value: 'nuora', label: 'Nuora' },
                    { value: 'genero', label: 'Genero' },
                    { value: 'suocero', label: 'Suocero' },
                    { value: 'suocera', label: 'Suocera' },
                    { value: 'nonno', label: 'Nonno' },
                    { value: 'nonna', label: 'Nonna' },
                    { value: 'nipote', label: 'Nipote (da nonno)' },
                    { value: 'moglie_nipote', label: 'Moglie nipote (da nonno)' },
                    { value: 'marito_nipote', label: 'Marito nipote (da nonno)' },
                    { value: 'fratello', label: 'Fratello' },
                    { value: 'sorella', label: 'Sorella' },
                    { value: 'cognato', label: 'Cognato' },
                    { value: 'cognata', label: 'Cognata' },
                    { value: 'bisnonno', label: 'Bisnonno' },
                    { value: 'bisnonna', label: 'Bisnonna' },
                    { value: 'pronipote', label: 'Pronipote' },
                    { value: 'moglie_pronipote', label: 'Moglie pronipote' },
                    { value: 'marito_pronipote', label: 'Marito pronipote' },
                    { value: 'zio', label: 'Zio' },
                    { value: 'zia', label: 'Zia' },
                    { value: 'moglie_zio', label: 'Moglie zio' },
                    { value: 'marito_zia', label: 'Marito zia' },
                    { value: 'nipote_c', label: 'Nipote-c (da figli fratello o sorella)' },
                    { value: 'moglie_nipote_c', label: 'Moglie nipote-c (da figli fratello o sorella)' },
                    { value: 'marito_nipote_c', label: 'Marito nipote-c (da figli fratello o sorella)' },
                    { value: 'coniuge', label: 'Coniuge' }
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INPS Report Code and Payment Method */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.inpsReport')}</h2>
        <div className="space-y-4">
          <div className="relative">
            <InputField
              label={t('contract.contract.fields.inpsCode')}
              name="contractColf.inpsCode"
              type="text"
              value={formData.contractColf.inpsCode || ''}
              onChange={handleInputChange}
            />
            <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {t('contract.contract.tooltips.inpsCode')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label={t('contract.contract.fields.paymentMethod')}
              name="contractColf.paymentMethod"
              value={formData.contractColf.paymentMethod}
              onChange={handleInputChange}
              options={paymentMethods.map((method) => ({
                value: method.id,
                label: t(`contract.contract.options.paymentMethods.${method.name}`)
              }))}
            />
            <InputField
              label={t('contract.contract.fields.iban')}
              name="contractColf.iban"
              type="text"
              value={formData.contractColf.iban || ''}
              onChange={handleInputChange}
              required={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractForm