import React, {Component} from 'react'
import {Icon} from 'antd'
import $ from 'jquery'
import './timeline.scss'
var pertime
class Timeline extends Component{
    state={
        play:false,
        flag:false,
        num:0,
        timearr:['2018/01/01','2018/02/01','2018/03/01','2018/04/01','2018/05/01','2018/06/01','2018/07/01','2018/08/01','2018/09/01','2018/10/01','2018/11/01','2018/12/01','2019/01/01','2019/02/01']
    }
    componentDidMount(){
        pertime = 490/this.state.timearr.length
        document.onmousemove = (e) => {
            e.preventDefault()
            if(this.state.flag){
                console.log(e)
                if(e.clientX>=514){
                    $(".swapitem").css('left',490);
                    this.setState({
                        play:false
                    })
                }else if(e.clientX-14<0){
                    $(".swapitem").css('left',0);
                    this.setState({
                        play:false
                    })
                }else{
                    $(".swapitem").css('left',e.clientX-15); 
                    let i = parseInt(e.clientX/pertime)
                    this.setState({
                        num:i
                    })
                    console.log(i)                
                }
            }
        }
        document.onmouseup = (e) => {
            e.preventDefault()
            this.setState({
                flag:false
            })
        }
    }
    changeStatus(e){
        this.setState({
            play:!this.state.play
        },()=>{
            if(this.state.play){
                this.playmap = setInterval(()=>{
                    if(this.state.num == this.state.timearr.length){
                        clearInterval(this.playmap)
                        this.setState({
                            play:false,
                            num:0
                        })
                        $(".swapitem").css('left',0); 
                    }else{
                        this.setState({
                            num:(this.state.num+1)%(this.state.timearr.length+1)
                        },()=>{
                            console.log(this.state.num)
                        })

                        $(".swapitem").css('left',this.state.num*pertime); 
                    }
                },1000)
            }else{
                console.log(2)
                clearInterval(this.playmap)
            }
        })
    }
    mousedown(e){
        this.setState({
            flag:true
        })
    }
    clickbar(e){
        console.log(e.clientX)
        $(".swapitem").css('left',e.clientX-15); 
        let i = parseInt(e.clientX/pertime)
        this.setState({
            num:i
        })
        console.log(i) 
    }
    render(){
        return (
            <div className="timeline">
                <span>
                    <Icon type={this.state.play?"pause":"caret-right"} onClick={e=>this.changeStatus(e)}></Icon>
                </span>
                <span className="linebar" onClick={e=>this.clickbar(e)}>
                    <span className="swapitem" onMouseDown={e=>this.mousedown(e)}></span>
                </span>
            </div>
        )
    }
}
export default Timeline