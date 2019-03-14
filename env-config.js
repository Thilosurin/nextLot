const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod ? '' : 'http://localhost:3000',
  'process.env.NAMESPACE': '',
  'process.env.CLIENT_ID': 'FhQe5Mn7ssbosOoEcSD3AuATnR2alA1r'
}
