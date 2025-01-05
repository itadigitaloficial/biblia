import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJXZWQgSnVsIDAzIDIwMjQgMjA6MTA6MjcgR01UKzAwMDAucm9nZXJpby5zeXNAZ21haWwuY29tIiwiaWF0IjoxNzIwMDM3NDI3fQ.TI-Obg0jc7BAZH0A1nXmUmWf2f2qU_FniD4uhtJ5XN0';
const API_BASE_URL = 'https://www.abibliadigital.com.br/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getVersions = () => api.get('/versions');
export const getBooks = () => api.get('/books');
export const getVerses = (version, book, chapter) => 
  api.get(`/verses/${version}/${book}/${chapter}`);
