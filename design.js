(function(){
        let Box = React.createClass({
            getInitialState: function(){
                return{
                    xdeg: 0,
                    ydeg: 0,
                    opacity: 0.5
                };
            },
            modify: function(){
                this.setState({
                    xdeg: this.state.xdeg+ Math.floor(Math.random()*20) ,
                    ydeg: this.state.ydeg+ Math.floor(Math.random()*20),
                    opacity: Math.random()
                });
            },
            componentDidMount: function(){
                this.state.animatorHandle = setInterval(this.modify, 500);
            },
            render: function(){
                return (
                    <div style={{
                        width: "400px",
                        height: "200px",
                        position: "absolute",
                        backgroundColor: this.props.backgroundColor,
                        opacity: this.state.opacity,
                        transform: "rotateX(" + this.state.xdeg + "deg) rotateY(" + this.state.ydeg + "deg)"
                    }}>
                    </div>
                    );
            }
        });
        let BoxMatrix = React.createClass({
            getInitialState: function(){
                return {
                    colors:[]
                }
            },
            componentWillMount: function(){
                let getRGBVal = () => Math.floor(Math.random()*255);
                for(let i=0; i<this.props.boxes;i++){
                    //this.state.colors.push("rgb(" + getRGBVal() + "," + getRGBVal() + "," + getRGBVal() +")");
                    this.state.colors.push("rgb(10," + getRGBVal() + ",10)");
                }
            },
            render: function(){
                return (
                    <div>
                        {this.state.colors.map((color)=><Box key={Math.random()} backgroundColor={color}/>)}
                    </div>
                );
            }
        });
        ReactDOM.render(<BoxMatrix boxes={150} />, document.getElementById("designContainer"));
    }
)();