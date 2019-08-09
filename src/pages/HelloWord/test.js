import React, { Fragment, PureComponent } from 'react';
import { Card, Input, Button, Table, Modal, Form, Icon, Divider, Pagination } from 'antd'
import ReactDOM from 'react-dom';
import { connect } from 'dva';
const style = {
    width: '400px',
    margin: '30px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    border: '1px solid #e8e8e8',

};

const { Meta } = Card;


@connect(({ table }) => ({
    table
}))


class test extends React.Component {

    state = {
        visible: false,
        ID: 0,
        data: [


        ],
        record: {
            id: "",
            title: "",
            content: "",
        },
        editFlag: '',
        index: 0,
        columns: [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
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
                    <span>
                        <a href="javascript:;" onClick={() => this.edit(record)}>编辑 </a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.delete(record)}>删除</a>
                    </span>
                ),
            },
        ],
    };
    componentDidMount() {
        const { dispatch, table: { data } } = this.props;

        dispatch({
            type: 'table/queryInitCards',

        }).then(() => {

            this.setState({
                data: this.props.table.data,
            })
        })

    };

    edit = (record) => {
        let form = this.props.form;
        this.state.record = record;
        // form.setFieldsValue({
        //     title: record.title,
        //     content: record.content,
        // });console.log(form.getFieldsValue())
        this.setState({
            visible: true,
            editFlag: 'edit',
            index: record.id,
        })
    };
    add = () => {
        this.setState({
            visible: true,
            editFlag: 'add',
            record: {},
        })
    };
    delete = (record) => {
        const { dispatch, table: { data } } = this.props;

        dispatch({
            type: 'table/deleteInitCards',
            payload: record.id,
        }).then(() => {

            this.setState({

                data: this.props.table.data,
            })

        })

    }
    handleOk = e => {

        const { editFlag, index } = this.state;

        let form = this.props.form;
        let id = this.state.ID;
        if (form.getFieldValue('title') === "" || form.getFieldValue('content') === "")
            return;
        if (editFlag === 'add') {

            const { dispatch, table: { data } } = this.props;

            dispatch({
                type: 'table/addInitCards',
                payload: { id: id, title: form.getFieldValue('title'), content: form.getFieldValue('content') },
            }).then(() => {

                this.setState({

                    data: this.props.table.data,
                })

            })

        } else {

            const { dispatch, table: { data } } = this.props;

            dispatch({
                type: 'table/updateInitCards',
                payload: { id: index, title: form.getFieldValue('title'), content: form.getFieldValue('content') },
            }).then(() => {

                this.setState({

                    data: this.props.table.data,
                })

            })
        }
        id += 1;

        //this.props.onClickAdd(...data);
        //let sourse={ID:state.ID+1,}



        this.setState({
            visible: false,

            ID: id,
        });


    }


    handleCancel = e => {

        this.setState({
            visible: false,
        });
    }
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
                                initialValue: this.state.record.title || '',
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
                                initialValue: this.state.record.content || '',
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
                <Table columns={this.state.columns} dataSource={this.state.data} rowKey={record => record.id}>
                    <Pagination defaultCurrent={1} total={50} />
                </Table>
            </Card>


        );

    }

}
const WrappedRegistrationForm = Form.create({ name: 'register' })(test);
//ReactDOM.render(<helloWord />, mountNode);
export default WrappedRegistrationForm;