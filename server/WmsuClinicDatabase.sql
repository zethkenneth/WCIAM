CREATE DATABASE WmsuClinicDatabase;

CREATE TABLE Account (
    AccountID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    AccountName VARCHAR(255) NOT NULL,
    AccountType VARCHAR(255) NOT NULL,
    AccountUsername VARCHAR(255) NOT NULL,
    AccountPassword VARCHAR(255) NOT NULL
);