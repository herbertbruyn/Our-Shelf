import { UserService } from '../services';
import { TokenService } from '../../common';

export default { 

  findOrCreate: async (req, res) => {

    if (!req || !req.body || !req.body.email) {
      return res.status(500).send({ message: 'Missing user data!' });
    }
    let user;
    try { user = await UserService.signInOrSignUp(req.body);
    } catch (e) { return res.status(500).send({ message: e.message || 'User sign in failed!' }); }

    return res.status(200).send({ token: TokenService.encode(user, process.env.JWT_SIGNATURE) });
  },

  checkToken: async (req) => {
    let token = TokenService.getFromRequest(req);
    if (!token) { throw new Error('No credentials found!'); }

    let userData;
    try { userData = TokenService.decode(token, process.env.JWT_SIGNATURE); 
    } catch (e) { throw new Error('Invalid token!'); }

    let user;
    try { user = await UserService.findById(userData._id); 
    } catch (e) { throw new Error(e.message); }

    if (!user) { throw new Error('Invalid credentials!'); }
  },

  find: async (req, res) => {
    let users;
    try { users = await UserService.find(req.query);
    } catch (e) { return res.status(500).send({ message: e.message || 'Search failed!' }); }
    if (!users) { return res.status(500).send({ message: e.message || 'No users found!' }); }

    return res.status(200).send(users);
  },

  update: async (req, res) => {
    let user;
    try { user = await UserService.update(req.params.id, req.body);
    } catch(e) { return res.status(500).send({ message: e.message || 'Update failed!' }); }
    if (!user) { return res.status(500).send({ message: 'User not found!' }); }

    return res.status(200).send({ token: TokenService.encode(user, process.env.JWT_SIGNATURE) });
  },

  delete: async (req, res) => {
    let user;
    try { user = await UserService.delete(req.params.id);
    } catch(e) { return res.status(500).send({ message: e.message || 'Deletion failed!' }); }
    if (!user) { return res.status(500).send({ message:'Register not found!'}); }

    return res.status(200).send({ message: 'Account removed!' });
  }    
};