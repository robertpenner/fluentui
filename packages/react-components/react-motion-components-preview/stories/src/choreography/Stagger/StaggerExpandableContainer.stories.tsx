import * as React from 'react';
import StaggerExpandableContainerDescription from './StaggerExpandableContainer.stories.md';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

const itemData = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' },
  { id: 4, title: 'Item 4' },
  { id: 5, title: 'Item 5' },
  { id: 6, title: 'Item 6' },
  { id: 7, title: 'Item 7' },
  { id: 8, title: 'Item 8' },
];

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    maxWidth: '400px',
  },
  controls: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
  },
  listContainer: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    transition: 'height 600ms ease-in-out',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  collapsed: {
    height: '160px', // Height for showing 2 items + peek of 3rd item for affordance
  },
  expanded: {
    height: '505px', // Height for showing all 8 items (36px each + padding + gaps + buffer)
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingVerticalM,
    gap: tokens.spacingVerticalS,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    height: '36px',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
});

export const ExpandableContainer = () => {
  const classes = useClasses();
  const [expanded, setExpanded] = React.useState(false);
  const [staggerVisible, setStaggerVisible] = React.useState(false);

  // Always show first 3 items (2 fully visible + 1 partially visible for affordance), additional items (4-8) animate via Stagger
  const staticItems = itemData.slice(0, 3);
  const staggerItems = itemData.slice(3);

  const handleToggle = () => {
    if (!expanded) {
      // "See more": First expand container, then show items via Stagger
      setExpanded(true);
      setTimeout(() => {
        setStaggerVisible(true);
      }, 300); // Wait for container expansion to start
    } else {
      // "See less": First hide extra items via Stagger (reversed), then contract container
      setStaggerVisible(false);
      setTimeout(() => {
        setExpanded(false);
        // Don't set staggerVisible to true here since we want them hidden when collapsed
      }, 300); // Wait for Stagger exit animation
    }
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.listContainer} ${expanded ? classes.expanded : classes.collapsed}`}>
        <div className={classes.list}>
          {/* Always visible items */}
          {staticItems.map(item => (
            <div key={item.id} className={classes.item}>
              <div className={classes.itemTitle}>{item.title}</div>
            </div>
          ))}

          {/* Items that animate via Stagger */}
          <Stagger visible={staggerVisible} itemDelay={100} reversed={!staggerVisible}>
            {staggerItems.map(item => (
              <Slide key={item.id}>
                <div className={classes.item}>
                  <div className={classes.itemTitle}>{item.title}</div>
                </div>
              </Slide>
            ))}
          </Stagger>
        </div>
      </div>

      <div className={classes.controls}>
        <Button onClick={handleToggle} appearance="primary">
          {expanded ? 'See less' : 'See more'}
        </Button>
      </div>
    </div>
  );
};

ExpandableContainer.parameters = {
  docs: {
    description: {
      story: StaggerExpandableContainerDescription,
    },
  },
};
