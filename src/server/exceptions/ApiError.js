class ApiError extends Error {
  constructor (status, ...params) {
    // Passer les arguments restants (incluant ceux spécifiques au vendeur) au constructeur parent
    super (...params);

    // Informations de déboguage personnalisées
    this.status = status;
  }
}

module.exports = ApiError;
