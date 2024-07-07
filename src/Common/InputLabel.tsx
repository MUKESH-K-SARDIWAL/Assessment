import { View, Text } from 'react-native'
import React, { memo } from 'react'

const InputLabel = ({ text, star = false }:any) => {
    return (
        <View className="flex-row items-center gap-1">
            <Text className="text-lightBlack text-sm" >{text}</Text>
            {star && <Text className="text-[#FF0000] text-sm" >*</Text>}
        </View>
    )
}

export default memo(InputLabel)