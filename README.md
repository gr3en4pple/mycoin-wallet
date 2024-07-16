# Bài tập cá nhân môn CCNTPTPM - CQ2020/3

## Cài đặt

Sử dụng node v18 trở lên

### Hoặc

Sử dụng [nvm](https://github.com/nvm-sh/nvm) để switch version node thành 18

## Package manager

```bash
yarn
```

hoặc

```bash
npm install
```

### Sau khi hoàn thành quá trình cài đặt các packages

```bash
yarn dev
```

hoặc

```bash
npm run dev
```

## Tóm tắt cách hoạt động

Dự án sử dụng Nextjs để làm giao diện phía client, cùng với thư viện NextUI, tailwind

### Thư viện

```bash
ethereumjs-wallet
```

Handle việc Tạo và Xác thực Keystore cho việc Access Wallet

```bash
viem
```

Handle việc Tạo và Xác thực Mnemonic Phrase, PrivateKey cho việc Access Wallet

### BlockchainProvider.js

Thực hiện khởi tạo validator khi vừa vào trang web bằng cách cho các node stake vào hệ thống (Thuật toán Proof of stake)

Sau khi đã có validator (max staker), thực hiện generateBlock sau mỗi khoảng thời gian BLOCK_TIME (BLOCK_TIME = 10s)
Validator sẽ được tặng 1 số tiền khi validate thành công block đó

Mỗi giao dịch transfer, reward cho validator sẽ được push vào array Transactions của mỗi Block.
Và sẽ được tính là thành công khi Block đó được tạo.
