/** @jsx React.DOM */


var START_POSTITION = 45;
var START_SCORE = 0;
var PLAYER_POSITION = START_POSTITION;


// Enenmy component
var Enemy = React.createClass({

    getInitialState() {
        return { pos: this.props.pos };
    },

    render() {
        return(
            <div className="enemy" id={this.state.pos}></div>
        )
    }
});

// Player component
var Player = React.createClass({

    getInitialState() {
        return {
            player : this.props.player,
            enemies: [],
            enemiesPositions: [],
            score: 0
        }
    },

    componentDidMount: function () {
        var cPos = this.getParentPosition(START_POSTITION);
        var playerNode = document.querySelector('.player');        
        logger.info('[Player mounted!]');
        document.addEventListener('keyup', (ev) => this.keyup(ev));
        playerNode.style.top = ( cPos.top + 5 ) + 'px';
        playerNode.style.left = ( cPos.left + 5 ) + 'px';
        this.setEnemies();
    },

    /**
     * Create random enemy
     * @param {number} pos enemy position on the board
     */
    createEnemyNode(pos) {
        const cPos = this.getParentPosition(pos);
        var _e = document.createElement('div');
        _e.style.top = cPos.top + 5 + 'px';
        _e.style.left = cPos.left + 5 + 'px';
        _e.setAttribute('class', 'enemy');
        _e.setAttribute('id', 'e'+pos);
        return _e;
    },

    updateScoreBoard(score) {
        var eventLog = document.querySelector('.event-viewer');
        eventLog.innerHTML = `${score}`;
        return;
    },

    /**
     * Set random bun enemies on the board
     */
    setEnemies() {
        logger.info(' [setting enemies] ');

        var enemies = [];
        var enemiesPos = [];

        for (let e = 0; e < 10; e++) {
            var enemyPos = Math.floor(Math.random() * 100);
            var enemyNode = this.createEnemyNode(enemyPos);
            enemies.push(enemyNode);
            enemiesPos.push(enemyPos);
        }
        for (let i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            var parent = document.querySelector('.gridContainer');
            logger.error(enemy);
            parent.appendChild(enemy);
        }

        this.setState({
            enemies: enemies,
            enemiesPositions: enemiesPos
        });
    },


    // TODO:* There is a problem where some enemies are not removed from the dom. when you move the player too quickly
    eat: function (pos) {
        var _enemies = this.state.enemies;
        var _enemiesPos = this.state.enemiesPositions;
        var parent = document.querySelector('.gridContainer');
        var node = document.querySelector(`#e${pos}`);

        parent.removeChild(node);

        this.state.enemiesPositions.forEach((e, i ) => {
            if (e === pos) {
                delete _enemies[i];
                delete _enemiesPos[i];
            }
        });

        this.setState({
            enemies: _enemies,
            enemiesPositions: _enemiesPos,
            score: this.state.score + 1
        });

        this.updateScoreBoard(this.state.score);
    },


    getParentPosition(pos) {
        var parentNode = document.getElementById(`${pos}`);
        var bounds = parentNode.getBoundingClientRect();

        return {
            top: bounds.top,
            left: bounds.left
        };
    },


    /**
     * Move player
     * @param {number} gPos position on the grid
     * @param {number} cPos client position in pixel
     */
    move: function (gPos, cPos) {
        var playerNode = document.querySelector('.player');
        var noEnemies = isEmptyArray(this.state.enemiesPositions);

        playerNode.style.top = ( cPos.top + 5 ) + 'px';
        playerNode.style.left = ( cPos.left + 5 ) + 'px';
        this.state.player.position = gPos;

        if (noEnemies) {
            logger.error('[enemies deplited]');
            this.setEnemies();
        }
        for (let i = 0; i < this.state.enemiesPositions.length; i++) {
            const enemyPos = this.state.enemiesPositions[i];
            
            if (enemyPos === gPos) {
                logger.success('[Eating enemy]');
                this.eat(enemyPos);

                if (noEnemies) {
                    this.setEnemies();
                }
            }
        }
    },


    keyup: function (ev) {
        if (ev.type != "keyup" && !ev.isTrusted) {
            return;
        }

        ev.preventDefault();

        if (ev.which === 38) {
            // move up  -> grid - 11
            var gridPos = this.state.player.position - 11 > 0 ? this.state.player.position - 10 : null
            if (gridPos === null) {
                return;
            }            
            var clientPos = this.getParentPosition(gridPos);
            this.move(gridPos, clientPos);
        } else if (ev.keyCode === 39) {
            // move right -> grid + 1
            var gridPos = this.state.player.position + 1 <= grid[grid.length -1][9] ? this.state.player.position + 1: null;
            if (gridPos === null) {
                return;
            }
            var clientPos = this.getParentPosition(gridPos);
            this.move(gridPos, clientPos);
        } else if (ev.keyCode === 40) {
            // move down -> grid + 11
            var gridPos = this.state.player.position + 11 <=  grid[grid.length -1 ][9]? this.state.player.position + 10 : null ;
            if (gridPos === null) {
                return;
            }
            var clientPos = this.getParentPosition(gridPos);
            this.move(gridPos, clientPos);
        } else if (ev.keyCode === 37) {
            // move left -> grid - 1 
            var gridPos = this.state.player.position - 1 > 0 ? this.state.player.position - 1 : null;
            if (gridPos === null) {
                return;
            }
            var clientPos = this.getParentPosition(gridPos);
            this.move(gridPos, clientPos);
        }
    },

    render: function () {
        return (
            <div className="player"></div>
        )
    }
});


// Box component
var Box = React.createClass({

    render: function () {
        return (
            <div className="box" id={this.props.pos}></div>
        )
    }
});

// Grid component
var Grid = React.createClass({

    getInitialState() {
        return { grid: window.grid };
    },

    render: function () {

        var boxes = [];
        this.state.grid.forEach(function (row, rIdx, matrix) {
            row.forEach(function (col, cIdx, matrix) {
                boxes.push(<Box pos={col} />);
            });
        });

        return (
            <div className="gridContainer">
                {boxes}
            </div>
        )
    }
});

// Board component
var Board = React.createClass({

    getInitialState: function () {
      return { grid: this.props.grid };
    },

    render: function () {
        return (
            <div>
                <Grid grid={this.state.grid}/>
                <Player player={new player(START_SCORE, START_POSTITION)} />
            </div>
        )
    }
});


// Container component
var Container = React.createClass({

    componentWillMount() {
        this.grid = window.grid;
        logger.info('[Container mounted!]');
    },

    render: function () {
        return (
            <div className="container">
                <h3> 
                    Board Game <br/><small>Score: <b className="event-viewer"></b></small>
                </h3>
                <Board grid={this.grid}/>
            </div>
        )
    }
});


React.renderComponent(
    <Container />,
    document.getElementById('main')
);
