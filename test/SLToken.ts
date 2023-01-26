import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SLT", function () {
 
  async function deploySLTFixture() {
  
    let totalSupply = '10000000000000000000000';

    // Contracts are deployed using the first signer/account by default
    const [owner, addr1,addr2] = await ethers.getSigners();

    const SLT = await ethers.getContractFactory("SLToken");
    const slt = await SLT.deploy(totalSupply);

    return { slt, owner, addr1,addr2 };
  }

  describe("Deployment", function () {

    it("Should assign the total supply of tokens to the owner", async function () {
      const { slt,owner  } = await loadFixture(deploySLTFixture);
      const ownerBalance = await slt.balanceOf(owner.address);
      expect(await slt.totalSupply()).to.equal(ownerBalance);
      
    })});

  describe("Transactions", function () {

    it("should transfer tokens between accounts", async function () {
        const { slt,owner,addr1,addr2 } = await loadFixture(deploySLTFixture);
        // Transfer 50 tokens from owner to addr1
        const ownerBalance = await slt.transfer(addr1.address,50);
        expect(await slt.balanceOf(addr1.address)).to.equal(50);

        // Transfer 20 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
       await slt.connect(addr1).transfer(addr2.address, 20);
       const addr2Balance = await slt.balanceOf(addr2.address);
       expect(addr2Balance).to.equal(20);
        
      })});


   

    

});
