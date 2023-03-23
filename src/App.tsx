import './App.css'
import SettingWindow from './components/SettingWindow'
import { Button, Group, MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [settingWindowOpened, { open: settingWindowOpen, close: settingWindowClose }] = useDisclosure(false)

  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
      }}
    >
      <Group position="center">
        <Button onClick={settingWindowOpen}>Open modal</Button>
      </Group>
      <SettingWindow opened={settingWindowOpened} onClose={settingWindowClose} />
    </MantineProvider>
  )
}

export default App
