import React from 'react'

const FormatTime = (data) => {
    const dateFormat= new Date(data)
    const fixTime = ('0'+dateFormat.getDate()).slice(-2)+
                    "-"+('0'+(dateFormat.getMonth()+1)).slice(-2)+
                    "-"+dateFormat.getFullYear()+
                    " "+('0'+dateFormat.getHours()).slice(-2)+
                    ":"+('0'+dateFormat.getMinutes()).slice(-2)+
                    ":"+('0'+dateFormat.getSeconds()).slice(-2)
    return fixTime
}

export default FormatTime