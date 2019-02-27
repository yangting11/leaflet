import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './layout.scss'
import {Layout, Menu, Icon} from 'antd'
const { Header, Footer, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Layoutpage extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'yyyy',
            logo:require('../../assets/images/avatar.jpg'),
            current: 'mail',
        }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }
    render(){
        return(
            <Layout>
                <Header>
                    <div>
                        <img src={this.state.logo} className="logo"/>
                        <span className="companyName">宁波水利行业地图测试</span>
                        <Menu className="menulist" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" >
                            <Menu.Item key="mail">
                                <Link to="/pageone"><Icon type="mail" />页面一</Link>
                            </Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />页面二</span>}>
                                <MenuItemGroup title="分类一">
                                    <Menu.Item key="setting:2-1"><Link to="pagetwo">子页面一</Link></Menu.Item>
                                    <Menu.Item key="setting:2-2"><Link to="pagethree">子页面二</Link></Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="分类二">
                                    <Menu.Item key="setting:2-3"><Link to="timeline">子页面三</Link></Menu.Item>
                                    <Menu.Item key="setting:2-4">子页面四</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />页面三</span>}>
                                <Menu.Item key="setting:3-1"><Link to="echart">子页面一</Link></Menu.Item>
                                <Menu.Item key="setting:3-2"><Link to="dthree">子页面二</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />页面四</span>}>
                                <MenuItemGroup title="分类一">
                                    <Menu.Item key="setting:4-1"><Link to="plotly">子页面一</Link></Menu.Item>
                                    <Menu.Item key="setting:4-2"><Link to="plotly2">子页面二</Link></Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />页面五</span>}>
                                <Menu.Item key="setting:5-1"><Link to="mapmove">子页面一</Link></Menu.Item>
                                <Menu.Item key="setting:5-2">子页面二</Menu.Item>
                            </SubMenu>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />页面六</span>}>
                                <Menu.Item key="setting:6-1">子页面一</Menu.Item>
                                <Menu.Item key="setting:6-2">子页面二</Menu.Item>
                            </SubMenu>
                        </Menu>
                        <span className="logout">
                            <Link to="/login">退出</Link>
                        </span>
                    </div>
                </Header>
                <Content>
                    {this.props.children}
                </Content>
            </Layout>
        )
    }
}

export default Layoutpage