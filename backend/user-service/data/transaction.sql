use finmaster;

CREATE TABLE transactions (
    account_no VARCHAR(255),
    transaction_date DATE,
    transaction_type VARCHAR(255),
    transaction_details VARCHAR(255),
    amount DECIMAL(15, 2),
    balance_amount DECIMAL(15, 2)
);

INSERT INTO transactions (account_no, transaction_date, transaction_type, transaction_details, amount, balance_amount) VALUES
('409000611074', '2017-06-29', 'Deposit', 'TRF FROM Indiaforensic SERVICES',  1000000, 1000000),
('409000611074', '2017-07-05', 'Deposit', 'TRF FROM Indiaforensic SERVICES',  500000, 1500000),
('409000611074', '2017-07-18', 'Deposit', 'FDRL/INTERNAL FUND TRANSFE', 3000000, 4500000),
('409000611074', '2017-08-01', 'Deposit', 'TRF FRM Indiaforensic SERVICES', 500000, 5000000),
('409000611074', '2017-08-16', 'Deposit', 'FDRL/INTERNAL FUND TRANSFE', 500000, 5500000),
('409000611074', '2017-08-16', 'Withdraw', 'INDO GIBL Indiaforensic STL01071', 133900, 5366100),
('409000611074', '2017-08-16', 'Withdraw', 'INDO GIBL Indiaforensic STL02071', 18000, 5348100),
('409000611074', '2017-08-16', 'Withdraw', 'INDO GIBL Indiaforensic STL03071', 5000, 5343100),
('409000611074', '2017-08-16', 'Withdraw', 'INDO GIBL Indiaforensic STL04071', 195800, 5147300),
('409000611074', '2017-08-16', 'Withdraw', 'INDO GIBL Indiaforensic STL05071', 81600, 5065700),
('409000493201', '2016-09-05', 'Deposit', 'TRF FROM Indiaforensic SERVICES', 500000, 500000),
('409000493201', '2016-09-06', 'Withdraw', 'BBPS SETTLEMENT DT 30/08/', 802.77, 499197.23),
('409000493201', '2016-09-06', 'Withdraw', 'BBPS SETTLEMENT DT 31/08/', 239.89, 498957.34),
('409000493201', '2016-09-06', 'Withdraw', 'BBPS SETTLEMENT DT 01/09/', 1193.54, 497763.80),
('409000493201', '2016-10-18', 'Withdraw', 'BBPS SETTLEMENT DTD 17.10', 32.99, 497730.81),
('409000493201', '2016-10-19', 'Withdraw', 'BBPS SETTLEMENT DTD 18.10', 16.30, 497714.51),
('409000493201', '2017-03-15', 'Deposit', 'TRF FROM Indiaforensic SERVICES', 67000, 564714.51),
('409000493201', '2017-03-16', 'Withdraw', 'BBPS SETTLEMENT 16032017', 89537.25, 475177.26),
('409000493201', '2017-03-16', 'Deposit', 'TRF FRM Indiaforensic SERVICES', 117000, 592177.26),
('409000493201', '2017-03-17', 'Withdraw', 'BBPS SETTLEMENT 17032017', 117674.17, 474503.09),
('409000493201', '2017-03-17', 'Deposit', 'TRF FRM Indiaforensic SERVICES', 150000, 624503.09),
('409000493201', '2017-03-18', 'Withdraw', 'BBPS OX01 SETTLEMENT 1803', 93646, 530857.09),
('409000493201', '2017-03-20', 'Deposit', 'TRF FRM Indiaforensic SERVICES', 150000, 680857.09),
('409000493201', '2017-03-20', 'Withdraw', 'BBPS SETTLEMENT FOR DT 20', 87337.96, 593519.13),
('409000493201', '2017-03-21', 'Withdraw', 'BBPS SETTLEMENT 21032017', 183235.55, 410283.58),
('409000493201', '2017-03-21', 'Deposit', 'T FRM Indiaforensic SERVICES IN', 200000, 610283.58),
('409000493201', '2017-03-22', 'Deposit', 'TRF FROM Indiaforensic SERVICES', 100000, 710283.58);


drop table transactions;