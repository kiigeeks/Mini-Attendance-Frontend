import axios from "axios"

export const FetchData = async (method, routing) => {
    const {data} = await axios({
        method: method,
        url: `${process.env.REACT_APP_BASEURL}/${routing}`
    })

    return data;
}

export const SendData = async (method, routing, reqData) => {
    const {data} = await axios({
        method: method,
        url: `${process.env.REACT_APP_BASEURL}/${routing}`,
        data: reqData
    })

    return data;
}

