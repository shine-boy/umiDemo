import React, { Fragment, PureComponent } from 'react';
import { Card, Input, Button, Table, Modal, Form, Icon, Divider } from 'antd'
import ReactDOM from 'react-dom';
const style = {
    width: '400px',
    margin: '30px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    border: '1px solid #e8e8e8',

};
const { Meta } = Card;
const namespace = 'table';
const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            });
        },
    };
};

@connect( mapDispatchToProps)
class helloWord extends React.Component {

    state = {
        visible: false,
        ID: 0,
        data: [


        ],
        editFlag: '',
        index: 0,
        columns: [
            {
                title: 'ID',
                dataIndex: 'ID',
                key: 'ID',
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record, index) => (
                    this.state.index = index,
                    <span>
                        <a href="javascript:;" onClick={() => this.edit(text)}>编辑 </a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.delete()}>删除</a>
                    </span>
                ),
            },
        ],
    };
    edit = () => {

        this.setState({
            visible: true,
            editFlag: 'edit'
        })
    }
    add = () => {
        this.setState({
            visible: true,
            editFlag: 'add'
        })

    };
    delete = () => {
        let data = this.state.data;
        data.splice(this.state.index, 1);
       
        this.setState({

            data: data,
        });
    }
    handleOk = e => {

        const { editFlag, index } = this.state;
        let data = this.state.data;
        let form = this.props.form;
        if (editFlag === 'add') {

            let state = this.state;
            data = state.data.concat({ ID: state.ID, title: form.getFieldValue('title'), content: form.getFieldValue('content') });
        } else {
            let form = this.props.form;
            data[index].title = form.getFieldValue('title');
            data[index].content = form.getFieldValue('content');


        }

        //let sourse={ID:state.ID+1,}



        this.setState({
            visible: false,
            data: data,
        });


    };


    handleCancel = e => {

        this.setState({
            visible: false,
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };

        return (

            <Card title="joke测试">
                <Modal
                    title="gf"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose={true}
                    id="modal"
                >
                    <Form {...formItemLayout}>

                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        whitespace: true,
                                        message: 'Please input your title!!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your title!',
                                    },
                                ],
                            })(<Input placeholder="标题" />)}
                        </Form.Item>
                        <Form.Item label="内容">
                            {getFieldDecorator('content', {
                                rules: [
                                    {
                                        whitespace: true,
                                        message: 'Please input your title!!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your title!',
                                    },
                                ],
                            })(<Input placeholder="内容" />)}
                        </Form.Item>



                    </Form>

                </Modal>
                <Button type="primary" icon="plus" onClick={this.add}>新建</Button>
                <Table columns={this.state.columns} dataSource={this.state.data}>

                </Table>


            </Card>


        );

    }

}
const WrappedRegistrationForm = Form.create({ name: 'register' })(helloWord);
//ReactDOM.render(<helloWord />, mountNode);
export default WrappedRegistrationForm;