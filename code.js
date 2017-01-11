(function(){
    let Ball = React.createClass({
        getInitialState: function(){
            return {
                t: this.props.minTop,
                l: this.props.minLeft,
                tx: 1,
                lx: 1,
                bounceCount:1
            }
        },

        move: function(){
            let self = this, bounceCount= self.state.bounceCount,
                newX = (coord,x,min,max) => (coord !== min && coord !== max) ? x: (bounceCount++, ( coord === min) ? 1 : -1),
                newTX = newX(self.state.t,self.state.tx,self.props.minTop,self.props.maxTop),
                newLX = newX(self.state.l,self.state.lx, self.props.minLeft,self.props.maxLeft),
                setLimits = (x,min,max) => Math.min(Math.max(x,min),max);
            this.setState({
                t: setLimits(self.state.t + newTX*self.props.speed,self.props.minTop,self.props.maxTop) ,
                l: setLimits(self.state.l + newLX*self.props.speed*1.6,self.props.minLeft,self.props.maxLeft) ,
                tx: newTX,
                lx: newLX,
                bounceCount: bounceCount
            });
            if(self.state.bounceCount >= 50){
                clearInterval(self.animatorHandle);
            }
        },

        componentDidMount: function(){
            let self = this;
            self.animatorHandle = setInterval(() => self.move(),self.props.interval);
        },

        render: function(){
            return ((this.state.bounceCount < 50 ) ?
                <div className="circle"
                    style={{top: this.state.t + 'px',
                        left: this.state.l + 'px',
                        width: this.props.size + "px",
                        height: this.props.size + "px",
                        "border-radius": this.props.size - Math.floor(this.props.size*0.25) + "px",
                        backgroundColor: this.props.bgColor
                    }}>
            </div>
            : null)
        }
    });

    let Box = React.createClass({
        getInitialState: function(){
            return {
                objects: []
            };
        },

        add: function(){
            let getRGBVal = () => Math.floor(Math.random()*255), obj = this.state.objects;
            obj.push(<Ball key={obj.length}
                        maxTop={this.container.offsetTop + (this.container.getBoundingClientRect().height-this.props.size)}
                        maxLeft={this.container.offsetLeft + (this.container.getBoundingClientRect().width-this.props.size)}
                        bgColor={"rgb(" + getRGBVal() + "," + getRGBVal() + "," + getRGBVal() +")"}
                        interval={this.props.interval}
                        size={this.props.size}
                        minTop={this.container.offsetTop}
                        minLeft={this.container.offsetLeft}
                        speed={Math.floor(1 + Math.random()*25)}/>);
            this.setState({
                objects: obj
            });
        },

        render: function(){
            let container = null, self = this;
            return (<div style={{float:"left"}}>
                        <div className="box" ref={(node)=> self.container = node }>
                            {this.state.objects.map((obj)=> obj)}
                        </div>
                        <div>
                            <button onClick={this.add}>Add</button>
                        </div>
            </div>);
        }
    });

    let Main = React.createClass({
        render: function(){
            return (<div>
                {this.props.intervals.map((val)=> <Box key={"div" + val} interval={val} size={val*1.5}/>)}
            </div>);
        }
    });
    ReactDOM.render(<Main intervals={[4,8,10,12,15,16,18,30]}/>, document.getElementById("main"));
})();
