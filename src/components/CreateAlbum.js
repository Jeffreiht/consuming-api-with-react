import React, { Component } from 'react';
import axios from 'axios';

class CreateAlbum extends Component {
    state = {
        title: '',
        id: '',
        albums: [],
        idSelected: '',
        userId: '',
        editing: false
    }

    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.setState({
            albums: res.data.map(album => album.id),
            idSelected: res.data[0].id
        })
        if (this.props.match.params.id) {
            const res = await axios.get('https://jsonplaceholder.typicode.com/albums/' + this.props.match.params.id);
            this.setState({
                title: res.data.title,
                editing: true,
                id: this.props.match.params.id,
                userId: res.data.userId,
                idSelected: this.props.match.params.id
            })
        }
    }
    

    onSubmit = async (e) => {
        e.preventDefault();
        const newAlbum = {
            title: this.state.title,
        };

        if (this.state.editing) {
            await axios.put('https://jsonplaceholder.typicode.com/albums/' + this.state.userId, newAlbum)
            alert('Se actualizo correctamente')
            setTimeout(() => {
                window.location.href = '/albums';
            }, 100);
        } else {
            const album = await axios.post('https://jsonplaceholder.typicode.com/albums/', newAlbum);
            alert('Se guardo correctamente')
            setTimeout(() => {
                window.location.href = '/albums';
            }, 100);
        }
    }
    onChange = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <form onSubmit={this.onSubmit}>
                        <h4>Create a Album Musical</h4>
                        <div className="form-group">
                            <select
                                className="form-control"
                                name="idSelected"
                                onChange={this.onChange}
                                value={this.state.idSelected}
                            >
                                {
                                    this.state.albums.map(id =>
                                        <option key={id} value={id}>
                                            {id}
                                        </option>
                                    )
                                }

                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={this.onChange}
                                required
                                value={this.state.title}
                            />
                        </div>

                        <button type="submit" className="btn btn-success">
                            Save a Album
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}


export default CreateAlbum;