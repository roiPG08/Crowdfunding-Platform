const {Campaign} =require("../contracts/Campaign.sol");

const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  contract("Campaign", accounts => {
      let campaign;
      const owner = accounts[0];
      const funder = accounts[1];
      const unlockTime = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  
      beforeEach(async () => {
          campaign = await Campaign.new(unlockTime, { from: owner });
      });
  
      it("should create a new project", async () => {
          await campaign.createProject("Test Project", 100, { from: owner });
          const project = await campaign.projects(1);
          assert.equal(project.name, "Test Project");
          assert.equal(project.goal, 100);
      });
  
      it("should fund a project", async () => {
          await campaign.createProject("Test Project", 100, { from: owner });
          await campaign.fundProject(1, 50, { from: funder, value: 50 });
          const project = await campaign.projects(1);
          assert.equal(project.currentFounds, 50);
      });
  
      it("should not allow the owner to fund their own project", async () => {
          await campaign.createProject("Test Project", 100, { from: owner });
          try {
              await campaign.fundProject(1, 50, { from: owner, value: 50 });
              assert.fail("The transaction should have reverted");
          } catch (err) {
              assert.include(err.message, "revert", "The error message should contain 'revert'");
          }
      });
  });
  