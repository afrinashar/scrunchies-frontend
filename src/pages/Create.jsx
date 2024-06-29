import {useState} from 'react'
 import axios from 'axios'
export const Create = () => {
    const [newUser, setNewUser] = useState(
        {
            name: '',
            category: '',
            photo: '',
            description: '',
            price: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('category', newUser.category);
        formData.append('name', newUser.name);
        formData.append('price', newUser.price);
        formData.append('description', newUser.description);

        axios.post('http://localhost:3001/items', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser, photo: e.target.files[0]});
    }

    return (
       <><form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="text"
                placeholder="name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
            />

            <input 
                type="text"
                name="price"
                value={newUser.price}
                onChange={handleChange}
            />
 <input 
                type="text"
                name="category"
                value={newUser.category}
                onChange={handleChange}
            />
             <input 
                type="text"
                name="description"
                value={newUser.description}
                onChange={handleChange}
            />
            <input 
                type="submit"
            />
        </form>
      
    </> );
 
}
