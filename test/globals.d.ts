declare namespace NodeJS {
    interface Global {
        testRequest: import ('supertest').SuperTest<import('supertest').Test>; /* importa globalmente o supertest e depoios o test do supertest */
    }  
}