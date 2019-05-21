import axios from 'axios';

export const getUser = async userId => {
    const { data } = await axios.get(`/api/users/profile/${userId}`);
    return data;
}

export const deleteUser = async authUserId => {
    const { data } = await axios.delete(`/api/users/${authUserId}`);
    return data;
}

export const getAuthUser = async authUserId => {
    const { data } = await axios.get(`/api/users/${authUserId}`);
    return data;
};

export const updateUser = async (authUserId, userData) => {
    const { data } = await axios.put(`/api/users/${authUserId}`, userData);
    // return data;
    console.log(data);
    console.log(authUserId, userData);
};

export const getUserFeed = async authUserId => {
    const { data } = await axios.get(`/api/users/feed/${authUserId}`);
    return data;
};


export const updateStatusUser = async (userData) => {
    const { data } = await axios.patch(`/api/users/${userData._id}`, userData);
    return data;
    // console.log(data);
    // console.log(userData, userData._id);
};

export const createMessages = async (authUserId, messagesData) => {
    const { data } = await axios.patch(`/api/messages/add/${authUserId}`, messagesData);
    // return data;
    console.log(data);
};

export const deleteMessages = async (authUserId) => {
    const { data } = await axios.put(`/api/messages/delete/${authUserId}`);
    // return data;
    console.log(data);
};

export const updateEther = async (authUserId, ether) => {
    const { data } = await axios.patch(`/api/users/eth/${authUserId}`, ether);
    return data;
};


//// Period
export const createPeriod = async (periodData) => {
    const { data } = await axios.post('/api/period/add', periodData);
    return data;
};

export const getPeriods = async () => {
    const { data } = await axios.get('/api/periods/');
    return data;
};

//// Reward
export const createReward = async (periodAddress, rewardData) => {
    const { data } = await axios.post(`/api/reward/${periodAddress}`, rewardData);
    // return data;
    console.log(data);
};

//// Ticket
export const createTicket = async (authUserId, ticketData) => {
    const { data } = await axios.post(`/api/ticket/${authUserId}`, ticketData);
    return data;
    // console.log(data);
};

export const getTicketsByUser = async userId => {
    const { data } = await axios.get(`/api/ticket/by/${userId}`);
    return data;
};

export const getTicketsByPeriod = async (periodId) => {
    const { data } = await axios.get(`/api/ticket/from/${periodId}`);
    return data;
    // console.log(data);
};

export const getUpdateReward = async (ticketData) => {
    const { data } = await axios.patch(`/api/ticket/update/${ticketData.tkID}`, ticketData);
    // return data;
    console.log(data);
};
