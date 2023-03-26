import request from 'supertest';
import app from '../app.js';

describe('Sign up feature', () => {
  describe('POST /signup/driver', () => {
    it('should register a new driver', async () => {
      const response = await request(app)
        .post('/signup/driver')
        .send({
          name: 'John Doe',
          email: 'johndoe@example.com',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Driver registered successfully' });
    });

    it('should send an email to the provider email with the random password', async () => {
      // TODO: Mock the sendEmail function and assert that it was called with the correct parameters
    });

    it('should return an error if the email is already registered', async () => {
      const response = await request(app)
        .post('/signup/driver')
        .send({
          name: 'John Doe',
          email: 'johndoe@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Email already registered' });
    });
  });

  describe('POST /signup/operator', () => {
    it('should register a new operator', async () => {
      const response = await request(app)
        .post('/signup/operator')
        .send({
          name: 'Jane Doe',
          email: 'janedoe@example.com',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Operator registered successfully' });
    });

    it('should send an email to the provider email with the random password', async () => {
      // TODO: Mock the sendEmail function and assert that it was called with the correct parameters
    });

    it('should return an error if the email is already registered', async () => {
      const response = await request(app)
        .post('/signup/operator')
        .send({
          name: 'Jane Doe',
          email: 'janedoe@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Email already registered' });
    });
  });
});