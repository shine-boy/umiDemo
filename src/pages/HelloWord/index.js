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
const namespace = 'table';

const mapStateToProps = (state) => {
    
    const cardList = state[namespace].data;
    
   
    return {
        cardList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => {
            const action = {
                type: `${namespace}/queryInitCards`,
                
            };
            dispatch(action);
        },
        addList:(value)=>{
            const action = {
                type: `${namespace}/addInitCards`,
                payload: value,
            };
            dispatch(action);
        },
        updateList:(value)=>{
            const action = {
                type: `${namespace}/updateInitCards`,
                payload: value,
            };
            dispatch(action);
        },
        deleteList:(value)=>{
            const action = {
                type: `${namespace}/deleteInitCards`,
                payload: value,
            };
            dispatch(action);
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
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
        this.props.getList();
    }

    edit = (record) => {
        
        this.setState({
            visible: true,
            editFlag: 'edit',
            index: record.ID,
        })
    }
    add = () => {
        this.setState({
            visible: true,
            editFlag: 'add'
        })


    };
    delete = (record) => {
        
        this.props.deleteList(record.ID);

        this.setState({
            ID: this.state.ID - 1,
            index:record.ID,
        });
    }
    handleOk = e=> {

        const { editFlag, index } = this.state;
        let data = this.state.data;
        let form = this.props.form;
        let id = this.state.ID;
        if (form.getFieldValue('title') === "" || form.getFieldValue('content') === "")
            return;
        if (editFlag === 'add') {
            this.props.addList({ ID: id, title: form.getFieldValue('title'), content: form.getFieldValue('content') });
            
        } else {
            this.props.updateList({ ID: index, title: form.getFieldValue('title'), content: form.getFieldValue('content') });

        }
        id += 1;
        
        //this.props.onClickAdd(...data);
        //let sourse={ID:state.ID+1,}



        this.setState({
            visible: false,
            data: data,
            ID: id,
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
                <Table columns={this.state.columns} dataSource={this.props.cardList}>
                    <Pagination defaultCurrent={1} total={50} />
                </Table>

                

            </Card>


        );

    }

}
const WrappedRegistrationForm = Form.create({ name: 'register' })(helloWord);
//ReactDOM.render(<helloWord />, mountNode);
export default WrappedRegistrationForm;