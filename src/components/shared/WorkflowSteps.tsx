'use client'

import React from 'react'

interface Step {
  id: string
  title: string
}

interface WorkflowStepsProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (index: number) => void
}

const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav aria-label="Progress" className="py-4">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isClickable = index <= currentStep + 1
          
          return (
            <li key={step.id} className="relative flex flex-col items-center">
              {/* Connecting Line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-5 left-[50%] w-full h-[2px] bg-gray-200">
                  <div
                    className="h-[2px] bg-blue-600 transition-all duration-300"
                    style={{ width: index < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}

              <div className="relative flex flex-col items-center">
                {/* Circle with Number */}
                <button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors
                    ${index < currentStep
                      ? 'bg-blue-600 text-white'
                      : index === currentStep
                      ? 'bg-amber-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                    }
                    ${isClickable ? 'cursor-pointer hover:bg-opacity-90' : 'cursor-not-allowed'}
                  `}
                >
                  {index + 1}
                </button>
                
                {/* Step Title */}
                <span className={`mt-2 text-sm text-center whitespace-nowrap
                  ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  {step.title}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default WorkflowSteps