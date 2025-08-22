import * as React from 'react';
import StaggerExpandableContainerDescription from './StaggerExpandableContainer.stories.md';
import { makeStyles, tokens, Button, motionTokens } from '@fluentui/react-components';
import { Stagger, Slide, Collapse } from '@fluentui/react-motion-components-preview';

const TOTAL_ITEMS = 8;
const VISIBLE_ITEMS_COUNT = 3;
const COLLAPSE_EXPAND_DELAY = 200;
const STAGGER_EXIT_DELAY = 300;
const COLLAPSE_DURATION = 600;
const COLLAPSED_HEIGHT = '130px';
const ITEM_HEIGHT = '36px';
const STAGGER_ITEM_DELAY = 100;

const itemData = Array.from({ length: TOTAL_ITEMS }, (_, index) => ({
  id: index + 1,
  title: `Item ${index + 1}`,
}));

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
    backgroundColor: tokens.colorNeutralBackground1,
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
    padding: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    height: ITEM_HEIGHT,
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
  const staticItems = itemData.slice(0, VISIBLE_ITEMS_COUNT);
  const staggerItems = itemData.slice(VISIBLE_ITEMS_COUNT);

  const handleToggle = () => {
    if (!expanded) {
      // "See more": First expand container via Collapse, then show items via Stagger
      setExpanded(true);
      setTimeout(() => {
        setStaggerVisible(true);
      }, COLLAPSE_EXPAND_DELAY); // Wait for Collapse expansion to start
    } else {
      // "See less": First hide extra items via Stagger (reversed), then contract container via Collapse
      setStaggerVisible(false);
      setTimeout(() => {
        setExpanded(false);
        // Don't set staggerVisible to true here since we want them hidden when collapsed
      }, STAGGER_EXIT_DELAY); // Wait for Stagger exit animation
    }
  };

  return (
    <div className={classes.container}>
      <Collapse
        visible={expanded}
        duration={COLLAPSE_DURATION}
        easing={motionTokens.curveEasyEase}
        fromSize={COLLAPSED_HEIGHT}
        animateOpacity={false}
      >
        <div className={classes.listContainer}>
          <div className={classes.list}>
            {/* Always visible items */}
            {staticItems.map(item => (
              <div key={item.id} className={classes.item}>
                <div className={classes.itemTitle}>{item.title}</div>
              </div>
            ))}

            {/* Items that animate via Stagger */}
            <Stagger visible={staggerVisible} itemDelay={STAGGER_ITEM_DELAY} reversed={!staggerVisible}>
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
      </Collapse>

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
