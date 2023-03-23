import { Button, Group, Modal, Switch, TextInput, createStyles, getStylesRef, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

interface SettingWindowProps {
  opened: boolean
  onClose: () => void
}

const useStyles = createStyles((theme) => ({
  switch: {
    marginTop: theme.spacing.md,
  },
}))

const SettingWindow: React.FC<React.PropsWithChildren<SettingWindowProps>> = ({ opened, onClose, children }) => {
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      apiKey: '',
      apiHost: 'https://api.openai.com',
      showWordCount: false,
    },
    validate: {
      apiHost: (value) => {
        if (!value) {
          return 'API host is required'
        }
        if (
          !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
            value,
          )
        ) {
          return 'Invalid API host'
        }
        return null
      },
    },
  })
  return (
    <Modal opened={opened} onClose={onClose} title="Settings" withCloseButton={false}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="API Key" withAsterisk placeholder='OpenAI API Key' {...form.getInputProps('apiKey')} />
        <TextInput label="API Host" withAsterisk placeholder='OpenAI API Host' {...form.getInputProps('apiHost')} />
        <Switch
          className={classes.switch}
          label="Show word count"
          {...form.getInputProps('showWordCount', { type: 'checkbox' })}
        />
        <Group position="right" mt="md">
          <Button onClick={() => form.reset()}>Reset</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      {children}
    </Modal>
  )
}

export default SettingWindow
