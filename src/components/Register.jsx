import React, { useState } from 'react';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          alias: formData.alias,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const messageErreur = await response.text();
        throw new Error(messageErreur || "Erreur lors de l'inscription.");
      }

      setSuccess('Compte créé avec succès !');
      setFormData({ name: '', alias: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Serveur backend non démarré (port 8080).'
          : err.message
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-header">
        <h1>Bright Ideas</h1>
        <p>Innovate. Connect. Create</p>
      </div>

      <div className="register-card">
        <h2>Register</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Entrez votre nom complet"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="alias">Alias</label>
            <input
              id="alias"
              type="text"
              name="alias"
              placeholder="Choisissez un pseudonyme"
              value={formData.alias}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="8 caractères minimum"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm PW</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}