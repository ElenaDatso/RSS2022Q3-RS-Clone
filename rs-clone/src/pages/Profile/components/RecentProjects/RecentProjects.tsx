import React, { useEffect, useState } from 'react';
import classes from './RecentProjects.module.scss';
import { useUser } from '../../../../contexts';
import { useProjects } from '../../../../contexts';
import ProjectType from '../../../../types/project/projectType';
import ProjectRow from '../ProjectRow/ProjectRow';

function RecentProjects() {
  const { ...uData } = useUser();
  const { ...projData } = useProjects();

  const [projectsList, setProjectsList] = useState<ProjectType[]>([]);
  const [recentList, setRecentList] = useState(uData.recentList);

  useEffect(() => {
    setRecentList(uData.recentList);
  }, [uData.currentUser, uData.recentList, recentList]);

  useEffect(() => {
    setProjectsList(projData.projects);
  }, [projData.projects, projectsList]);

  return (
    <div className={classes.teamProjects_wrap}>
      <div className={classes.teamProjects_inner}>
        {projectsList.length > 0 &&
          projectsList
            .filter((project) => recentList.includes(project._id))
            .map((project) => ProjectRow(project))}
      </div>
    </div>
  );
}

export default RecentProjects;
