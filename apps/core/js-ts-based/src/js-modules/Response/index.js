const fetchUserList = async () => {
  return new Response(JSON.stringify([{ name: "John Doe" }]));
};

const userList = await fetchUserList();

console.log(await userList.json());
