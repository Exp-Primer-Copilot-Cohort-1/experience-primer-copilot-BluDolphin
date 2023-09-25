function skillsMember() {
  let member = document.querySelector('.member');
  let memberSkills = document.querySelector('.member__skills');
  let memberSkillsList = document.querySelector('.member__skills-list');
  let memberSkillsListItems = document.querySelectorAll('.member__skills-list-item');
  let memberSkillsListItemsLength = memberSkillsListItems.length;
  let memberSkillsListItemsWidth = memberSkillsListItems[0].offsetWidth;
  let memberSkillsListWidth = memberSkillsListItemsWidth * memberSkillsListItemsLength;
  let memberSkillsListItemsWidthPercent = memberSkillsListItemsWidth / memberSkillsListWidth * 100;
  let memberSkillsListItemsWidthPercentLast = 100 - memberSkillsListItemsWidthPercent * (memberSkillsListItemsLength - 1);

  memberSkillsList.style.width = memberSkillsListWidth + 'px';

  member.addEventListener('mousemove', function (e) {
    let memberWidth = member.offsetWidth;
    let memberHeight = member.offsetHeight;
    let memberLeft = member.offsetLeft;
    let memberTop = member.offsetTop;
    let memberCenterX = memberLeft + memberWidth / 2;
    let memberCenterY = memberTop + memberHeight / 2;
    let memberCenterXPercent = (e.pageX - memberCenterX) / memberWidth * 100;
    let memberCenterYPercent = (e.pageY - memberCenterY) / memberHeight * 100;

    memberSkillsList.style.transform = 'translate(' + memberCenterXPercent + '%, ' + memberCenterYPercent + '%)';
  });

  member.addEventListener('mouseleave', function () {
    memberSkillsList.style.transform = 'translate(0, 0)';
  });

  memberSkillsListItems.forEach(function (item, i) {
    item.style.left = memberSkillsListItemsWidthPercent * i + '%';
  });

  memberSkillsListItems[memberSkillsListItemsLength - 1].style.left = memberSkillsListItemsWidthPercentLast + '%';
} 