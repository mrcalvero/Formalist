class Poem extends React.Component {
  constructor(props){
    super(props);
    const rhymeArray = props.rhymeScheme.split('')
    this.state = {
    rhymeScheme: rhymeArray,
    lines: new Map(rhymeArray.map((rhyme)=>[rhyme, localStorage.getItem(`rhyme-${rhyme}`) || '']))
  	};
  }
  
  handleChange = (rhyme,value) => {
  localStorage.setItem(`rhyme-${rhyme}`,value);
  	this.setState(prevState => ({
  lines: prevState.lines.set(rhyme, value)
}));
  }
  

	render = () =>
		<div clasName="Poem">
		{
		this.state.rhymeScheme.map(
		(rhyme,index)=>
		<Line
			number={1+index}
			handler={this.handleChange}
			data={this.state.lines}
			rhyme={rhyme}
			key={`line${index}`} />
		
		)
		}
		<div className="faircopy">
		{
		this.state.rhymeScheme.map(
		(rhyme,index)=><>{this.state.lines.get(rhyme)}<br /></>
)
		}</div>
		</div>
}

const Line = ({data,handler,number,rhyme})=>
<div className={`Line rhyme-${rhyme.toUpperCase()}`}>
<label><span>{number} {rhyme}</span>
<input
onChange={(e)=>handler(rhyme,e.target.value)}
value={data.get(rhyme)}
/>
</label>
</div>
