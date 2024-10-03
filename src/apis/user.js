import { instance } from './index';

const apiGetUsers = () => {
	return instance.get('/v1/users');
};

export { apiGetUsers };
