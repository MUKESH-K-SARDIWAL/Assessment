import { Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'

const BlueBtn = ({ text, handlePress, height, boldness = true, color = true, disable }: any) => {

    return (
        <TouchableOpacity onPress={disable ? handlePress : null} className={` ${color == true ? 'bg-blue' : 'bg-orange'}  flex items-center justify-center w-full rounded-md`} style={{ height: height }}>
            <Text className="text-white text-sm">
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default memo(BlueBtn)