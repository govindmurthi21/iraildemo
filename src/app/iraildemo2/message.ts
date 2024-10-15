type Message = {
    message: string,
    spamOrNot: string,
    kafkaTopic: string,
    kafkaPartition: number,
    kafkaOffset: string,
    receiverId: string,
    receiverQueue: string,
    receiverTime: string,
    producerId: string,
    producerQueue: string,
    producerTime: string,
}

export default Message;