import React, { useState } from 'react'
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { captureScreen } from 'react-native-view-shot'

import { FeedbackType } from '../../components/Widget'
import { ScreenshotButton } from '../../components/ScreenshotButton'
import { Button } from '../../components/Button'


import { styles } from './styles'
import { theme } from '../../theme'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api'

interface Props{
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props){
  const [screenshot, setScreenShot] = useState<string | null>(null)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [comment, setComment] = useState('')

  function handleScreenShot(){
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then( uri => {
      console.log(uri)
      setScreenShot(uri)
    })      
    .catch(error => console.log(error))
  }

  function handleScreenshotRemove(){
    setScreenShot(null)
  }

  async function handleSendFeedback(){
    if(isSendingFeedback){
      return
    }

    setIsSendingFeedback(true)

    try{ 
      await api.post('/feedbacks',{
        type: feedbackType,
        screenshot,
        comment,
      })

      onFeedbackSent()
      
    }catch(erro){
      console.log(erro)
      setIsSendingFeedback(false)
    }
  }

  const feedbackTypeInfo = feedbackTypes[feedbackType]
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight={'bold'}
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder='Algo nao esta funcionando bem? Queremos corrigir'
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View>
        <ScreenshotButton
          onTakeShot={handleScreenShot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button
        onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>

    </View>
  )
}