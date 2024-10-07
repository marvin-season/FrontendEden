const promise = new Promise((resolve, reject) => {
  reject('hi')
  console.log('hello');
});
promise.catch(console.log)