const request = async () => {
    const response: Response = await fetch('');
    response.body?.getReader()
}
