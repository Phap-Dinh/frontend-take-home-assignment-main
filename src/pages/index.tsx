import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'
import { api } from '@/utils/client/api'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

// Answer 6: Implement quick filter/tab feature
const Index = () => {
  const tabs: string[] = ['all', 'completed', 'pending']
  const [activeTab, setActiveTab] = useState(tabs[0])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  })

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs.Root
          value={activeTab}
          defaultValue={tabs[0]}
          onValueChange={handleTabChange}
          className="pt-10"
        >
          <Tabs.List className="flex items-center justify-start gap-2 text-base">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                className={clsx(
                  'rounded-full border border-gray-200  px-6 py-3 capitalize hover:border-gray-400',
                  {
                    'bg-gray-700 text-white': tab == activeTab,
                  }
                )}
              >
                {tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabs.map((tab) => (
            <Tabs.Content key={tab} value={tab}>
              <div className="pt-10">
                <TodoList
                  todos={
                    tab == 'all'
                      ? todos
                      : todos.filter((todo) => todo.status == tab)
                  }
                />
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
