import React, { Component } from 'react';

class PhoneInfo extends Component {
	static defaultProps = {
		info: {
			name: '이름',
			phone: '010-0000-0000',
			id: 0,
		},
	};

	state = {
		// 수정버튼을 눌렀을 때 editing 값을 true로 설정
		// true일때는 텍스트 형태가 input 형태로 변환
		editing: false,
		name: '',
		phone: '',
	};

	handleRemove = () => {
		// 삭제 버튼이 클릭되면 onRemove에 id 넣어서 호출
		const { info, onRemove } = this.props;
		onRemove(info.id);
	};

	// editing값 반전
	handleToggleEdit = () => {
		const { editing } = this.state;
		this.setState({ editing: !editing });
	};

	// input에서 onChange 이벤트 발생 될 때 호출
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	// 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
	// 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
	componentDidUpdate(prevProps, prevState) {
		const { info, onUpdate } = this.props;
		if (!prevState.editing && this.state.editing) {
			this.setState({
				name: info.name,
				phone: info.phone,
			});
		} else if (prevState.editing && !this.state.editing) {
			onUpdate(info.id, {
				name: this.state.name,
				phone: this.state.phone,
			});
		}
	}

	render() {
		console.log('Render');
		const style = {
			border: '1px solid black',
			padding: '8px',
			margin: '8px',
		};

		const { editing } = this.state;

		if (editing) {
			// 수정모드
			return (
				<div style={style}>
					<div>
						<input
							value={this.state.name}
							name="name"
							placeholder="이름"
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							value={this.state.phone}
							name="phone"
							placeholder="전화번호"
							onChange={this.handleChange}
						/>
					</div>
					<button onClick={this.handleToggleEdit}>적용</button>
					<button onClick={this.handleRemove}>삭제</button>
				</div>
			);
		} else {
			const { name, phone } = this.props.info;

			return (
				<div style={style}>
					<div>
						<b>{name}</b>
					</div>
					<div>{phone}</div>
					<button onClick={this.handleToggleEdit}>수정</button>
					<button onClick={this.handleRemove}>삭제</button>
				</div>
			);
		}
	}
}

export default PhoneInfo;
