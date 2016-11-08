import React,{Component} from 'react';
import FileUpload from 'react-fileupload';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

const imgStyle = {
  height:200,
  width:400,
}

export default class Uploader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      size:100,
      url:"",
    };

    this.uploadSuccess = this.uploadSuccess.bind(this);
    this.uploading = this.uploading.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);

    this.options={
        baseUrl:'http://182.61.33.210/upload',
        fileFieldName:"file",
        param:{id:this.props.id},
        uploadSuccess:this.uploadSuccess,
        uploading:this.uploading,
        beforeUpload:this.beforeUpload,
        chooseAndUpload:true,
    }

  }

  uploadSuccess(res) {
    this.setState({url:"/"+res.Name});
    this.props.success('/'+res.Name);
  }

  uploading(p) {
    this.setState({completed:p.loaded});
  }

  beforeUpload(files,mill) {
    this.setState({size:files[0].size});
    return true;
  }

  componentDidMount() {
  }

  render() {
    return (
        <FileUpload options={this.options} >
          <img src={this.state.url} style={imgStyle}/>
          
          <FlatButton label="上传" ref="chooseAndUpload" />
          <LinearProgress mode="determinate" value={this.state.completed} max={this.state.size}/>
        </FileUpload>
    )
  }
}