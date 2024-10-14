type Message = {
    message: string,
    spamOrNot: string,
    kafkaTopic: string,
    kafkaPartition: number,
    kafkaOffset: string,
    rabbitId: string,
    rabbitQueue: string,
    rabbitTime: string,
}

export default Message;