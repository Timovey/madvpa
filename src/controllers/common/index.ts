import { Controller } from '../../common/types';
import postService from './service';

const RequestController: Controller = () => {
	const actions = postService();
	return {
		basePath: '/request',
		methods: [
			{
				path: '/getRecommend',
				method: 'post',
				action: actions.getRecommend
			}
		]
	};
};
export default RequestController;
