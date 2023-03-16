const contacts = require('./contacts.json')

const routes = [
    {
        method:'GET',
        path:'/contacts',
        handler: (request, h) =>{
            const data = JSON.stringify(contacts);
            return h.response(data).code(200);
        }
    },
    {
        method: 'POST',
      path: '/contacts',
      handler: (request, h) => {
        const { name, email, phone } = request.payload;
        const id = contacts[contacts.length - 1].id + 1;

        contacts.push({
          id,
          name,
          email,
          phone
        });

        const response = h.response({ message: 'Contact added successfully' });
        response.code(201);
        return response;
        }
    },
    {
        method: 'DELETE',
        path: '/contacts/{id}',
        handler: (request, h) => {
          const { id } = request.params;
          const index = contacts.findIndex(contact => contact.id === Number(id));
  
          if (index === -1) {
            const response = h.response({ message: 'Contact not found' });
            response.code(404);
            return response;
          }
  
          contacts.splice(index, 1);
  
          return { message: 'Contact deleted successfully' };
        }
    }
]

module.exports = routes;
