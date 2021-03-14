import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AlbumList extends Component {

    state = {
        albums: []
    }



    componentDidMount() {
        this.getAlbums();
    }

    async getAlbums() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.setState({
            albums: res.data
        })
    }

    async deleteAlbum(id){
        console.log(id)
        await axios.delete('https://jsonplaceholder.typicode.com/albums/' + id)
        alert('Se elimino el album')
        setTimeout(() => {
            window.location.href = "/albums"
        }, 100);
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Albums Musicales</h1>
                <hr color="black"/>
                <div className="row">
                    {
                        this.state.albums.map(album => (
                            <div className="col-md-4 p-2" key={album.id}>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h4>UserId: {album.userId}</h4>
                                    </div>
                                    <div className="card-body">
                                        <h5><strong>Disco:</strong> {album.id}</h5>
                                        <h6><strong>Titulo:</strong> {album.title}</h6>
                                    </div>

                                    <div className="card-footer">
                                    <Link className="btn btn-warning btn-block" to={"/albums/edit/" + album.id}>Editar</Link>
                                        <button className="btn btn-danger btn-block" onClick={()=>{this.deleteAlbum(album.userId)}}>
                                            Borrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default AlbumList;