import { h, Component } from 'preact';
import SDK from '../api';


import { Consumer } from '../store';
import Register from '../routes/register';

class Wrapped extends Component {
	async onSubmit(args) {
		this.setState({ loading: true });
		const user = await SDK.grantVisitor({ visitor: { ...args, token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) } });
		this.setState({ loading: false });
		this.actions({ user });
	}

	constructor() {
		super();
		this.state = {
			loading: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	render(props, { loading }) {
		return (
			<Consumer>
				{
					({ dispatch }) => {
						this.actions = dispatch;
						return (<Register color={props.theme.color} {...props} loading={loading} title={I18n.t('Need help?')} onSubmit={this.onSubmit} />);
					}}
			</Consumer>);
	}
}
export default Wrapped;