-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS crypto;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS crypto.user (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    status VARCHAR(1),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PROFILE TABLE
CREATE TABLE IF NOT EXISTS crypto.profile (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    birthday DATE,
    gender VARCHAR(20),
    phone VARCHAR(20),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES crypto.user(id)
);

-- BROKERAGE REGISTRATION TABLE
CREATE TABLE IF NOT EXISTS crypto.brokerage_registration (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    profile_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES crypto.profile(id)
);

-- ADDRESS TABLE
CREATE TABLE IF NOT EXISTS crypto.address (
    id VARCHAR(36) PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zipcode INT(8),
    profile_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES crypto.profile(id)
);

-- DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS crypto.document (
    id VARCHAR(36) PRIMARY KEY,
    type_document VARCHAR(100),
    number_document VARCHAR(100),
    profile_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES crypto.profile(id)
);

-- TRANSACTION CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS crypto.transaction_config (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    available_value FLOAT,
    quantity FLOAT,
    user_id VARCHAR(36),
    active BOOLEAN DEFAULT FALSE,
    lever INT DEFAULT 1,
    broker_id VARCHAR(36),
    profile_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES crypto.brokerage_registration(id),
    FOREIGN KEY (profile_id) REFERENCES crypto.profile(id)
);

-- TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS crypto.transactions (
    id VARCHAR(36) PRIMARY KEY,
    profile_id VARCHAR(36),
    transaction_config_id VARCHAR(36),
    type ENUM('BUY', 'SELL') NOT NULL,
    quantity FLOAT NOT NULL,
    price FLOAT NOT NULL,
    transaction_date DATETIME NOT NULL,
    earned_value FLOAT,
    earned_quantity FLOAT,
    status VARCHAR(255),
    order_id VARCHAR(255),
    client_order_id VARCHAR(255),
    request JSON,
    count INT CHECK (count <= 3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES crypto.profile(id),
    FOREIGN KEY (transaction_config_id) REFERENCES crypto.transaction_config(id)
);