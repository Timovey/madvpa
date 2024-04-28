import { Controller } from '../../common/types';
import postService from './service';

const CommonController: Controller = () => {
	const actions = postService();
	return {
		basePath: '/common',
		methods: [
			{
				path: '/getRecommend',
				method: 'post',
				action: actions.getRecommend
			}
		]
	};
};
export default CommonController;
