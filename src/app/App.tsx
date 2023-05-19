import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/className';
import { AppRouter } from 'app/providers/router';
import { Suspense } from 'react';

const App = () => (
    <div className={classNames('app', {})}>
        <Suspense fallback="">
            <div className="content-page">
                <AppRouter />
            </div>
        </Suspense>
    </div>
);

export default App;
